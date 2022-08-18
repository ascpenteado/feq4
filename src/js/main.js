const template = `
{{#.}}
    <article class="reports_item">
        <a href="{{cover}}" target="_blank">
            <img class="reports_cover" src="{{cover}}" alt="{{title}} Cover"/>
        </a>
        <footer class="reports_docs">
            {{#documents}}
                <h3 class="reports_title">
                    <a href="{{url}}" target="_blank">{{title}} <span>({{file_size}} {{file_type}})</span></a>
                </h3>
            {{/documents}}
        </footer>
    </article>
{{/.}}
`;

const reportsWidget = {
  options: {
    containerSelector: ".reports",
    template,
  },

  renderReports: function (reports) {
    const { containerSelector, template } = this.options;

    $(containerSelector).html(Mustache.render(template, reports));
  },

  init: function () {
    this.renderReports(reportData || []);
  },
};

reportsWidget.init();
