var Window          = require('pex-sys/Window');
var PerspCamera     = require('pex-cam/PerspCamera');
var Arcball         = require('pex-cam/Arcball');
var createCube      = require('primitive-cube');
var glslify         = require('glslify-promise');
var isBrowser       = require('is-browser');
var interpolateAngle = require('../');

Window.create({
    settings: {
        width:  512,
        height: 512,
        type: '2d'
    },
    fromAngle: 0,
    toAngle: Math.PI/3,
    init: function()  {

    },
    onMouseMove: function(e) {
        var W = this.getWidth();
        var H = this.getHeight();
        var x = e.x - W/2;
        var y = e.y - H/2;
        this.toAngle = Math.atan2(y, x);
    },
    draw: function() {
        var ctx = this.getContext();

        var W = this.getWidth();
        var H = this.getHeight();
        var R = W * 0.4;

        ctx.fillStyle = '#FFFFFF';
        ctx.lineWidth = 2;

        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = '#000000';
        ctx.beginPath()
        ctx.arc(W/2, H/2, R, 0, Math.PI*2)
        ctx.stroke();

        ctx.strokeStyle = '#c80000';
        ctx.beginPath()
        ctx.moveTo(W/2, H/2);
        ctx.lineTo(W/2 + R * Math.cos(this.fromAngle), H/2 + R * Math.sin(this.fromAngle))
        ctx.stroke()
        ctx.closePath()

        ctx.strokeStyle = '#3fa202';
        ctx.beginPath()
        ctx.moveTo(W/2, H/2);
        ctx.lineTo(W/2 + R * Math.cos(this.toAngle), H/2 + R * Math.sin(this.toAngle))
        ctx.stroke()
        ctx.closePath()

        var midAngle = interpolateAngle(this.fromAngle, this.toAngle, 0.5);
        ctx.strokeStyle = '#0216a2';
        ctx.beginPath()
        ctx.moveTo(W/2, H/2);
        ctx.lineTo(W/2 + R * Math.cos(midAngle), H/2 + R * Math.sin(midAngle))
        ctx.stroke()
        ctx.closePath()

    }
})
