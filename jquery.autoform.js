;(function ( $, window, document, undefined ) {

    $(document).ready(function() {
        new Plugin($('form'));
    });

    var pluginName = "autoform",
        defaults = {};

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            var _this = this;
            $(_this.element).each(function(index, element) {
                Mousetrap.bind('f a', function() {
                    _this.autoform(element, _this.settings);
                });
            });
        },
        autoform: function (element, settings) {
            var $form = $(element);
            var text_types = $form.find('input[type=text], input[type=password], input[type=hidden], textarea');
            $(text_types).each(function(index, text_type) {
                $(text_type).val(randomChar());
            });

            var select_types = $form.find('select');
            $(select_types).each(function(index, select_type) {
                var options = $(select_type).find('option');
                var random_options_index = randomNumber(0, options.length);
                options.each(function(option_index, option) {
                    if (option_index === random_options_index) {
                        $(select_type).val($(option).val());
                    }
                });
            });

            var check_types = $form.find('input[type=checkbox]');
            var checkbox_groups = [];
            check_types.each(function(index, checkbox) {
                checkbox_groups = $.merge(checkbox_groups, [$(checkbox).attr('name')]);
                $(checkbox).prop('checked', false); // 全てのチェックボックスを解除
            });
            $.each(checkbox_groups.uniq(), function(index, name) {
                var checkbox = $('input[name="'+name+'"]');
                var break_count = randomNumber(1, checkbox.length);
                var count = 0;
                while (true) {
                    checkbox = $('input[name="'+name+'"]').filter(':not(:checked)');
                    var check_number = randomNumber(0, checkbox.length - 1);
                    $(checkbox.get(check_number)).prop('checked', true);
                    count++;
                    if (count >= break_count) {
                        break;
                    }
                }
            });

            var radio_types = $form.find('input[type=radio]');
            var radio_groups = [];
            radio_types.each(function(index, radio) {
                radio_groups = $.merge(radio_groups, [$(radio).attr('name')]);
                $(radio).prop('checked', false);
            });
            $.each(radio_groups.uniq(), function(index, name) {
                var radio = $('input[name="'+name+'"]');
                var radio_number = randomNumber(0, radio.length - 1);
                $(radio.get(radio_number)).prop('checked', true);
            });
        }
    };

    Array.prototype.uniq = function() {
        var o = {},
            i,
            l = this.length,
            r = [];

        for (i = 0; i < l; i += 1) o[this[i]] = this[i];
        for (i in o) r.push(o[i]);

        return r;
    };

    var randomChar = function (number, b) {
        number = number || 10;
        b = b || '';
        var a = 'abcdefghijklmnopqrstuvwxyz'
            + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            + '0123456789'
            + b;
        a = a.split('');
        var s = '';
        for (var i = 0; i < number; i++) {
            s += a[Math.floor(Math.random() * a.length)];
        }
        return s;
    };

    var randomNumber = function(low, high) {
        low = low || 0;
        return Math.floor(Math.random() * (1 + high - low)) + low;
    };

    var dummyMailAddress = function (account, domain) {
        account = account || randomChar(10);
        domain = domain || randomChar(4) + '.com';
        return account + '@' + domain;
    };

})( jQuery, window, document);