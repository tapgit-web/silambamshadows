import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Training from './pages/Training';
import { Contact } from './pages/Contact';
import Nav from './menu/Nav';

const originalFetch = global.fetch;

jest.setTimeout(30000);

beforeEach(() => {
  // All form requests stay in the test process, including unexpected requests.
  global.fetch = jest.fn().mockRejectedValue(new Error('Unexpected form request'));
});

afterEach(() => {
  global.fetch = originalFetch;
});

function renderPrograms(initialEntry = '/Training') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/Training" element={<Training />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </MemoryRouter>
  );
}

function completeEnquiry(program = 'Silambam') {
  userEvent.type(screen.getByLabelText(/full name/i), 'Anitha Kumar');
  userEvent.type(screen.getByLabelText(/email address/i), 'anitha@example.com');
  userEvent.type(screen.getByLabelText(/phone number/i), '+91 9876543210');
  userEvent.selectOptions(screen.getByRole('combobox'), program);
  userEvent.type(screen.getByLabelText(/address \/ locality/i), 'Sellur, Madurai');
}

test('training category filters change the available programs and can restore all programs', () => {
  renderPrograms();
  const programs = screen.getByRole('region', { name: 'Training programs' });
  expect(within(programs).getAllByRole('article')).toHaveLength(7);

  userEvent.click(screen.getByRole('button', { name: 'Martial arts' }));
  expect(within(programs).getAllByRole('article')).toHaveLength(5);
  expect(screen.getByRole('heading', { name: 'Silambam', exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Yoga', exact: true })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Martial arts' })).toHaveAttribute('aria-pressed', 'true');

  userEvent.click(screen.getByRole('button', { name: 'Mind & body' }));
  expect(within(programs).getAllByRole('article')).toHaveLength(2);
  expect(screen.getByRole('heading', { name: 'Yoga', exact: true })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Archery', exact: true })).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: 'Silambam', exact: true })).not.toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: 'All programs' }));
  expect(within(programs).getAllByRole('article')).toHaveLength(7);
});

test('a program enquiry link navigates to contact and prefills the chosen program', () => {
  renderPrograms();
  userEvent.click(screen.getByRole('link', { name: 'Explore Yoga' }));
  expect(screen.getByRole('combobox')).toHaveValue('Yoga');
  expect(screen.getByRole('button', { name: 'Send your enquiry' })).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('required fields and invalid email prevent enquiry submission', () => {
  renderPrograms('/Contact');
  userEvent.click(screen.getByRole('button', { name: 'Send your enquiry' }));
  expect(screen.getByLabelText(/full name/i)).toBeInvalid();
  expect(global.fetch).not.toHaveBeenCalled();

  completeEnquiry();
  const email = screen.getByLabelText(/email address/i);
  userEvent.clear(email);
  userEvent.type(email, 'not-an-email');
  userEvent.click(screen.getByRole('button', { name: 'Send your enquiry' }));
  expect(email).toBeInvalid();
  expect(global.fetch).not.toHaveBeenCalled();
});

test('valid enquiry disables duplicate submissions and posts the existing Google Form fields', async () => {
  let resolveRequest;
  global.fetch.mockImplementation(() => new Promise((resolve) => { resolveRequest = resolve; }));
  renderPrograms('/Contact');
  completeEnquiry();
  userEvent.click(screen.getByRole('button', { name: 'Send your enquiry' }));

  const pendingButton = screen.getByRole('button', { name: /sending your enquiry/i });
  expect(pendingButton).toBeDisabled();
  expect(screen.getByLabelText(/full name/i)).toBeDisabled();
  userEvent.click(pendingButton);
  expect(global.fetch).toHaveBeenCalledTimes(1);

  const [url, request] = global.fetch.mock.calls[0];
  expect(url).toBe('https://docs.google.com/forms/d/e/1FAIpQLSfAg9BagaXUmVDOAHL5iW_7kGpBGZnfaW_A5VX_8xa1uhM8nQ/formResponse?usp=publish-editor');
  expect(request).toMatchObject({ method: 'POST', mode: 'no-cors' });
  expect(Object.fromEntries(request.body.entries())).toEqual({
    'entry.1761238309': 'Anitha Kumar',
    'entry.306920288': 'anitha@example.com',
    'entry.1914095922': '+91 9876543210',
    'entry.1126123725': 'Sellur, Madurai',
    'entry.358377344': 'SILAMBAM',
  });

  await act(async () => { resolveRequest({ type: 'opaque' }); });
  expect(screen.getByRole('status')).toHaveTextContent('Receipt cannot be confirmed here');
  expect(screen.getByRole('button', { name: 'Enquiry submitted for delivery' })).toBeDisabled();
  expect(screen.getByLabelText(/full name/i)).toHaveValue('Anitha Kumar');
});

test('failed enquiry preserves details, provides a prefilled fallback, and allows retry', async () => {
  global.fetch.mockRejectedValueOnce(new Error('Network unavailable'));
  renderPrograms('/Contact?program=Valari');
  completeEnquiry('Valari');
  userEvent.click(screen.getByRole('button', { name: 'Send your enquiry' }));

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('We could not confirm delivery'));
  expect(screen.getByLabelText(/email address/i)).toHaveValue('anitha@example.com');
  expect(screen.getByRole('button', { name: 'Send your enquiry' })).toBeEnabled();
  const values = Object.fromEntries(global.fetch.mock.calls[0][1].body.entries());
  expect(values['entry.358377344']).toBe('OTHERS');
  expect(values['entry.1126123725']).toBe('Sellur, Madurai\nProgram of interest: Valari');

  const fallback = new URL(screen.getByRole('link', { name: /continue with your details/i }).href);
  expect(fallback.pathname).toContain('/viewform');
  expect(fallback.searchParams.get('entry.1761238309')).toBe('Anitha Kumar');
  expect(fallback.searchParams.get('entry.358377344')).toBe('OTHERS');
  expect(fallback.searchParams.get('entry.1126123725')).toContain('Program of interest: Valari');

  global.fetch.mockResolvedValueOnce({ type: 'opaque' });
  userEvent.click(screen.getByRole('button', { name: 'Send your enquiry' }));
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Receipt cannot be confirmed here'));
  expect(global.fetch).toHaveBeenCalledTimes(2);
});

test('mobile navigation closes with Escape and returns focus to the toggle', () => {
  render(<MemoryRouter><Nav /></MemoryRouter>);
  const toggle = screen.getByRole('button', { name: 'Open navigation' });
  userEvent.click(toggle);
  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  screen.getByRole('link', { name: 'Training' }).focus();

  userEvent.keyboard('{Escape}');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();

  userEvent.click(toggle);
  userEvent.click(screen.getByRole('link', { name: 'Training' }));
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.getByRole('link', { name: 'Training' })).toHaveAttribute('aria-current', 'page');
});
