/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   myscript.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: hurabe <hurabe@student.42.fr>              +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/12/15 01:30:40 by urabex            #+#    #+#             */
/*   Updated: 2024/12/17 19:07:54 by hurabe           ###   ########.fr       */
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

var vert = `
#ifdef GL_ES
precision highp float;
precision highp int;
#endif
#extension GL_OES_standard_derivatives : enable

// attributes, in
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;
attribute vec4 aVertexColor;

// attributes, out
varying vec3 var_vertPos;
varying vec4 var_vertCol;
varying vec3 var_vertNormal;
varying vec2 var_vertTexCoord;

// matrices
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
//uniform mat3 uNormalMatrix;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);

  // just passing things through
  // var_vertPos      = aPosition;
  // var_vertCol      = aVertexColor;
  // var_vertNormal   = aNormal;
  // var_vertTexCoord = aTexCoord;
}`;

var frag = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;



const float Pi = 3.14159;

float sinApprox(float x)
{
  x = Pi * floor(x / Pi);
  return (4.0 / Pi) * x - (4.0 / Pi) * x * abs(x);
}

float cosApprox(float x)
{
  return sinApprox(x * Pi);
}

void main()
{
  vec2 p = (2.0*gl_FragCoord.xy-resolution)/max(resolution.x,resolution.y);
  for(int i = 1; i < 50; i++)
  {
    vec2 newp = p;
    float speed = 100.0;
    newp.x += 0.6/float(i)*sin(float(i)*p.y+time/(300.0/speed)+0.3*float(i));
    newp.y += 0.6/float(i)*cos(float(i)*p.x+time/(300.0/speed)+0.3*float(i+10))-2.0;
    p = newp;
  }
  vec3 color = vec3(0.4 * tan(0.6+p.y)+.5, 1.0*sin(1.2*p.y), 1.6+sin(p.x+p.y));
  gl_FragColor = vec4(color, 1.0);
}`



function windowResized() {
    resizeCanvas(w, h);
}