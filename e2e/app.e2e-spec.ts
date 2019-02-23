import { ZepWebAppPage } from './app.po';

describe('zep-web-app App', () => {
  let page: ZepWebAppPage;

  beforeEach(() => {
    page = new ZepWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
