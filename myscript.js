/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   myscript.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: hurabe <hurabe@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/15 01:30:40 by urabex            #+#    #+#             */
/*   Updated: 2024/12/17 18:38:25 by hurabe           ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

var program;
var w;
var h;

var slider = 0;
var gui;

function setup() {
    sliderRange(0, 4, 1);
    gui = createGui('p5.gui');
    gui.addGlobals('slider');
    
    pixelDensity(1);
    w = document.documentElement.scrollWidth;
    h = document.documentElement.scrollHeight;
    createCanvas(w, h, WEBGL);
    gl = this.canvas.getContext('webgl');
    rectMode(CENTER);
    noStroke();
    fill(1);
}

function draw() {
    if (slider == 0) {
        program = createShader(vert, frag);
    } if (slider == 1) {
        program = createShader(vert, frag1);
    } if (slider == 2) {
        program = createShader(vert, frag2);
    } if (slider == 3) {
        program = createShader(vert, frag3);
    } if (slider == 4) {
        program = createShader(vert, frag4);
    }
    shader(program);
    background(0);
    program.setUniform('resolution', [width, height]);
    program.setUniform('time', millis() / 1000);
	rect(0, 0, width, height);
}

// 


function windowResized() {
    resizeCanvas(w, h);
}