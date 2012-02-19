
const St = imports.gi.St;
const Gio = imports.gi.Gio;

const VERY_FAST_SLOW_DOWN_FACTOR = 0.001;

function AnimationSpeedControl() {
    this._init();
}

AnimationSpeedControl.prototype = {
    _init: function() {
        this._oldSlowDownFactor = 1.0; // default to 1.0

        this._schema = new Gio.Settings({ schema: 'org.gnome.shell.extensions.animation-speed-control' });
    },

    enable: function() {
        this._oldSlowDownFactor = St.get_slow_down_factor();

        let new_slow_down = this._schema.get_double("speed");

        if (new_slow_down <= 0)
            new_slow_down = VERY_FAST_SLOW_DOWN_FACTOR;

        global.log("old slow down factor " + this._oldSlowDownFactor);
        global.log("new slow down factor " + new_slow_down);
        
        St.set_slow_down_factor(new_slow_down);
    },

    disable: function() {
        St.set_slow_down_factor(this._oldSlowDownFactor);
    }
};

function init() {
    return new AnimationSpeedControl();
}