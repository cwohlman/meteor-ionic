IonLoading = {
  show: function (userOptions) {
    var userOptions = userOptions || {};
    var options = _.extend({
      delay: 0,
      duration: null,
      customTemplate: null,
      backdrop: false
    }, userOptions);
    
    if (options.backdrop) {
      IonBackdrop.retain();
      $('.backdrop').addClass('backdrop-loading');
    }

    this.timeout = Meteor.setTimeout(function () {
      this.timeout = null;
      
      this.template = Template['ionLoading'];
      this.view = Blaze.renderWithData(this.template, {template: options.customTemplate}, $('.ionic-body').get(0));
      
      var $loadingEl = $(this.view.firstNode());
      $loadingEl.addClass('visible');
      this.visible = true;

      Meteor.setTimeout(function () {
        $loadingEl.addClass('active');
      }, 10);
    }.bind(this), options.delay);

    if (options.duration) {
      Meteor.setTimeout(function () {
        this.hide();
      }.bind(this), options.duration);
    }
  },

  hide: function () {
    if (this.visible) {
      var $loadingEl = $(this.view.firstNode());
      $loadingEl.removeClass('active');
  
      Meteor.setTimeout(function () {
        IonBackdrop.release();
        $loadingEl.removeClass('visible');
        Blaze.remove(this.view);
        this.visible = false;
      }.bind(this), 400);
    } else if (this.timeout) {
      Meteor.clearTimeout(this.timeout);
    }
  }
};
