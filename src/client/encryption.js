

//JS (semi) implementation of sha1, changed some stuff
//only works for strings
function sha1(str) {
    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;//don't worry about it


    str +='Ç';//I said don't worry about it
    let len = str.length;
    if (len > 64){
        return sha1(str.slice(0,63)) ^ sha1(str.slice(63,len));
    }
    else if(len < 64){
        for(len; len < 64; len++)
            str = str+0;
    }
    let w = [];
    for(let i = 0; i < 80; i++){

        if (i < 16) {
            // converting raw byte code of string to int
            w[i] = str.charCodeAt(i * 4) + (str.charCodeAt(i * 4 + 1) << 8) + (str.charCodeAt(i * 4 + 3) << 16) + (str.charCodeAt(i * 4 + 3) << 24);
        }else{
            w[i] = circleShift(w[i-3] ^ w[i-8] ^ w[i-14] ^ w[i-16],-1);
        }
        // console.log("str:" + str[i]);
        // console.log("strchar:" + str.charCodeAt(i));
        // console.log("w[i]:"+ w[i]);
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;

        for(let j = 0; j < 80; j++){

            let temp;// this isn't a memory leak
            let f;
            let k;

            if(j < 20){
                f = (b & c) | ((!b) & d);
                k = 0x5A827999;
            }else if(j < 40){
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            }else if(j < 60){
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            }else if(j < 80){
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            // console.log("f:"+f);
            // console.log("k:"+k);
            // console.log("cshifta:"+circleShift(a,-5));
            // console.log("w[j]:"+w[j]);
            temp = (circleShift(a,-5)) + f + e + k + w[i];
            e = d;
            d = c;
            c = circleShift(b,-30);
            b = a;
            a = temp;

            // console.log("a:"+a);
            // console.log("b:"+b);
            // console.log("c:"+c);
            // console.log("d:"+d);
            // console.log("e:"+e);
            // console.log("");
        }

        h0 = ((h0+a)>>>0)%4294967296;//using >>> to convert signed to unsigned
        h1 = ((h1+b)>>>0)%4294967296;//4294967296 is 2^32
        h2 = ((h2+c)>>>0)%4294967296;//javascript's automatic variable typing is fun
        h3 = ((h3+d)>>>0)%4294967296;
        h4 = ((h4+e)>>>0)%4294967296;
        // console.log("h0:"+h0);
        // console.log("h1:"+h1);
        // console.log("h2:"+h2);
        // console.log("h3:"+h3);
        // console.log("h4:"+h4);
        // console.log("");
        // console.log("--------------------------------------------");
        // console.log("");
    }
    let ret = "";

    //gave up on putting this in a loop, still not as bad as the block

    ret+=String.fromCodePoint(Math.floor(h0%(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h0%(1<<16))/(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h0%(1<<24))/(1<<16)));
    ret+=String.fromCodePoint(Math.floor(h0/(1<<24)));
    ret+=String.fromCodePoint(Math.floor(h1%(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h1%(1<<16))/(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h1%(1<<24))/(1<<16)));
    ret+=String.fromCodePoint(Math.floor(h1/(1<<24)));
    ret+=String.fromCodePoint(Math.floor(h2%(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h2%(1<<16))/(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h2%(1<<24))/(1<<16)));
    ret+=String.fromCodePoint(Math.floor(h2/(1<<24)));
    ret+=String.fromCodePoint(Math.floor(h3%(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h3%(1<<16))/(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h3%(1<<24))/(1<<16)));
    ret+=String.fromCodePoint(Math.floor(h3/(1<<24)));
    ret+=String.fromCodePoint(Math.floor(h4%(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h4%(1<<16))/(1<<8)));
    ret+=String.fromCodePoint(Math.floor((h4%(1<<24))/(1<<16)));
    ret+=String.fromCodePoint(Math.floor(h4/(1<<24)));
    // console.log(ret);
    return ret;
}


//shifts the bits with ones going off the end wrapping around
// - for left + for right
// can't shift more than length in bits
function circleShift(a,num){
    let temp;
    if(num > 0) {
        temp = a % (1 << num);
        return ((a >> num) | temp);
    }
    else if(num < 0) {
        temp = a / (1 << -num);
        return ((a << num) | temp);
    }
    else if(num === 0){
        return a;
    }
}

export {sha1 as sha1}