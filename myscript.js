/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   myscript.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: urabex <urabex@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/15 01:30:40 by urabex            #+#    #+#             */
/*   Updated: 2024/12/16 23:48:05 by urabex           ###   ########.fr       */
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

