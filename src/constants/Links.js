'use strict';
import React from 'react';

let link = "https://nlcc-backend-1.onrender.com/";
let paylink = "https://app.gasglide.com/api/transect/";
let paylinkusd = "https://app.gasglide.com/api/payment/";
let pdflink = "https://app.gasglide.com/api/storage/bookpdf";

class Apilink  {
    getLink() {
        return link;
    }

    getPayLink() {
        return paylink;
    }

    getUsdLink() {
        return paylinkusd;
    }

    getPdfLink() {
        return pdflink;
    }
}

module.exports = new Apilink();