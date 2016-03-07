import 'babel-polyfill';

function toFilename(path) {
  if (path.indexOf('.') < 0) { path += '/index.html'; }
  return path.replace(/^(\\|\/)+/, '');
}

function renderComponent(Site, Component) {
  render(toFilename(Component.meta.path), Site.Layout(Site.meta, Component);
}

function renderSite(Site) {
  for (let Component of Site.components) {
    renderComponent(Site, Component);
  }
}

function renderSites(sites) {
  for (let site of sites) {
    import Site from `./${site}`;
    renderSite(Site);
  }
}

export default function(render, done) {
  renderSites('info');
  done();
}
