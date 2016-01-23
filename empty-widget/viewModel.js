widgetViewModelCtor =

/**
 * Create a Empty widget ViewModel
 * @constructor
 */
function EmptyWidgetViewModel() {
    //observable data
    this.data = ko.observable(0).extend({ numeric: 1 });
    this.unit = ko.observable("");

    //widget identifier
    this.widget = null;

    /**
     * Initialization method
     * @param widget widget class object
     */
    this.initialize = function (widget) {
        this.widget = widget;

        //we create the battery indicator
		ToolbarApi.addBatteryIconToWidget(this.widget);
    };

	/**
    * Configuration Changed handler
    */
    this.configurationChanged = function () {

        var self = this;

        //we get the unit of the keyword
        KeywordManager.get(self.widget.configuration.device.keywordId, function (keyword) {
            self.unit($.t(keyword.units));
        });

		//we listen for the keyword configured
        this.widget.ListenKeyword(this.widget.configuration.device.keywordId);

        //we fill the deviceId of the battery indicator
		ToolbarApi.configureBatteryIcon(this.widget, this.widget.configuration.device.deviceId);
    }

    /**
    * New acquisition handler
    * @param keywordId keywordId on which new acquisition was received
    * @param data Acquisition data
    */
    this.onNewAcquisition = function (keywordId, data) {
        var self = this;

        if (keywordId == self.widget.configuration.device.keywordId) {
            //it is the right device
            self.data(data.value);
        }
    };

	/**
    * Resize handler
    */
    this.resized = function () {
        var self = this;

        
    };
};