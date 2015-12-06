Number.prototype.toBinary = function() {
    return new Binary(toBase(this, 2, 10).join(""));
};

Number.prototype.toOctal = function() {
    return new Octal(toBase(this, 8, 10).join(""));
};

Number.prototype.toHex = function() {
    return new Hex(toBase(this, 16, 10));
};

Number.prototype.concat = function(dec) {
    return this.toString() + dec.toString();
}
Number.prototype.unshift = function(bin) {
    var val = this.toString();
    return val.substr(0, val.length - 1);
}
var Binary = function(value) {
    this.value = value.toString().split("").filter(function(a) {
        return (a > -2 && a < 2); // Make sure values are [0-1]
    }).join("");
    this.BASE = 2; // Binary base
    Binary.prototype.toString = function(base) {
        if (base) return this.value + "B";
        return this.value;
    };
    Binary.prototype.toOctal = function() {
        return this.toDecimal().toOctal();
    };
    Binary.prototype.toDecimal = function() {
        return toBase(this.value, 10, this.BASE);
    };
    Binary.prototype.toHex = function() {
        return this.toDecimal().toHex();
    };
    Binary.prototype.concat = function(bin) {
        this.value += bin.toString();
        return this.value;
    }
    Binary.prototype.unshift = function() {
        this.value = this.value.substr(0, this.value.length - 1);
        return this.value;
    }
};

var Octal = function(value) {
    this.value = value.toString().split("").filter(function(a) {
        return (a > -8 && a < 8); // Make sure values are [0-7]
    }).join("");
    this.BASE = 8; // Octal base
    Octal.prototype.toString = function(base) {
        if (base) return this.value + "Q";
        return this.value;
    };
    Octal.prototype.toBinary = function() {
        var rep = [["0","1","2","3","4","5","6","7"],
        ["000","001","010","011","100","101","110","111"]];
        var ret = this.value.split("");
        for (var i in ret) ret[i] = rep[1][rep[0].indexOf(ret[i])];
        return new Binary(ret.join(""));
    };
    Octal.prototype.toDecimal = function() {
        return toBase(this.value, 10, this.BASE);
    };
    Octal.prototype.toHex = function() {
        return this.toDecimal().toHex();
    };
    Octal.prototype.add = function(a) {
        return new Octal((this.toDecimal() + a.toDecimal()).toOctal());
    };
    Octal.prototype.concat = function(oct) {
        this.value += oct.toString();
    }
    Octal.prototype.unshift = function() {
        this.value = this.value.substr(0, this.value.length - 1);
        return this.value;
    }
};

var Hex = function(value) {
    if (!Array.isArray(value)) value = value.toString().split("");
    this.value = value.map(function(a) {
        // Make sure values are [0-9][A-F]
        var rep = [[10, 11, 12, 13, 14, 15], ["A", "B", "C", "D", "E", "F"]];
        for (var i in rep[0])
            if (rep[0][i] == a) return rep[1][i];
        if (a < 16 || (isNaN(a) && rep[1].indexOf(a.toUpperCase()) > -1))
            return (isNaN(a)) ? a.toUpperCase() : a;
    }).join("");
    this.BASE = 16; // Hex base
    Hex.prototype.toString = function(base) {
        if (base) return this.value + "H";
        return this.value;
    };
    Hex.prototype.toBinary = function() {
        var rep = [["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"],
        ["0000","0001","0010","0011","0100","0101","0110","0111",
         "1000","1001","1010","1011","1100","1101","1110","1111"]];
        var ret = this.value.split("");
        for (var i in ret) ret[i] = rep[1][rep[0].indexOf(ret[i])];
        return new Binary(ret.join(""));
    };
    Hex.prototype.toOctal = function() {
        return this.toDecimal().toOctal();
    };
    Hex.prototype.toDecimal = function() {
        return this.toBinary().toDecimal();
    };
    Hex.prototype.add = function(b) {
        return new Hex((this.toDecimal() + b.toDecimal()).toHex());
    };
    Hex.prototype.concat = function(hex) {
        this.value += hex.toString();
    }
    Hex.prototype.unshift = function() {
        this.value = this.value.substr(0, this.value.length - 1);
        return this.value;
    }
};

function toBase(value, outputBase, inputBase) {
    if (inputBase === 10) {
        var quotient = value, remainder = [];
        while (quotient > 0) {
            remainder.push(quotient % outputBase);
            quotient = parseInt(quotient/outputBase);
        }
        return remainder.reverse();
    }
    else if (outputBase === 10) {
        var result = 0;
        for (var i in value) {
            result = (result * inputBase) + parseInt(value[i]);
        }
        return result;
    }
    return value;
}
