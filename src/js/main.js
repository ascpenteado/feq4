const cardsTemplatePath = "../templates/report-card.mustache";

// See more btn configs
const reportsLimit = reportData.length;
const increaseBy = 6;
const totalPages = Math.ceil(reportsLimit / increaseBy);
let currentPage = 1;
let reportsToRender = reportData.slice(0, increaseBy);

// Btn handler
const btn = $("#see_more");
btn.click(function () {
  handleSeeMoreBtnClick();
});

const handleSeeMoreBtnClick = async () => {
  const currentIndex = currentPage * increaseBy;
  currentPage++;
  reportsToRender = reportData.slice(currentIndex, increaseBy * currentPage);
  const template = await getTemplate(cardsTemplatePath);

  reportsToRender.forEach((report) => {
    $(reportsWidget.containerSelector).append(
      Mustache.render(template, report)
    );
  });

  if (currentPage >= totalPages) {
    btn.prop("disabled", true);
  }
};

const getTemplate = async (path) => {
  if (!path) return;

  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(
      `Could not retrieve the template file! Status: ${response.status}`
    );
  }

  const data = await response.text();
  return data;
};

const reportsWidget = {
  containerSelector: ".reports",
  renderReports: function (reports) {
    getTemplate(cardsTemplatePath).then((template) =>
      $(this.containerSelector).html(Mustache.render(template, reportsToRender))
    );
  },
  init: function (data) {
    this.renderReports(data || []);
  },
};

reportsWidget.init(reportsToRender);
