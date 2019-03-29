(function() {
  $(document).ready(() => {
    let tabs = $("#explore-usecases .tabs li");
    let tabsContent = $("#explore-usecases .tabs-content .tab");

    function showTab(index) {
      tabs.removeClass("is-active");
      tabs.eq(index).addClass("is-active");
      tabsContent.hide();
      tabsContent.eq(index).show();
    }

    showTab(0);

    tabs.on("click", function() {
      showTab($(this).index());
    });
  });
})();
