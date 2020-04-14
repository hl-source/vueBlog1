const express = require('express');
const svgCaptcha = require('svg-captcha');

module.exports = (req,res)=>{
    let {text,data} = svgCaptcha.create();
    req.session.registerVCode = text;
    res.send({
        code : 0,
        data,
    });
};


