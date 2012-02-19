/*
Animation Speed Control for GNOME Shell
Copyright (C) 2012 Maciek Borzecki <maciek.borzecki@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
*/

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