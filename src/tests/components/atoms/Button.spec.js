import { render, screen } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('<Button />', () => {
  it('render', () => {
    render(<Button>This is a button</Button>);
    const btn = screen.getByText('This is a button');
    expect(btn).toBeVisible();
  });

  it('render with correct classes', () => {
    render(<Button className="anything">This is a button</Button>);
    const btn = screen.getByText('This is a button');
    expect(btn).toHaveClass('anything');
  });

  it('render a Link if href is provided', () => {
    render(<Button href="/home">Home</Button>);
    const btn = screen.getByRole('link', { name: 'Home' });
    expect(btn).toHaveAttribute('href', '/home');
  });
});
