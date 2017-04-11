import { MeanBookPage } from './app.po';

describe('mean-book App', () => {
  let page: MeanBookPage;

  beforeEach(() => {
    page = new MeanBookPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
