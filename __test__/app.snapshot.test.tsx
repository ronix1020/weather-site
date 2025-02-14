import { render } from '@testing-library/react';
import App from '@/app/page';

describe('App Snapshot', () => {
  it('debe coincidir con el snap', () => {
    const { container } = render(<App />);
    expect(container).toMatchSnapshot();
  });
});