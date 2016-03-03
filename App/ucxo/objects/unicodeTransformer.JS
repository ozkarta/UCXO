var unicodeTransformer=function(){
	this.swapArray=[];

	unicodeTransformer.prototype.init=function(){
		this.swapArray.push(new swapObject('ა','a'));
		this.swapArray.push(new swapObject('ბ','b'));
		this.swapArray.push(new swapObject('გ','g'));
		this.swapArray.push(new swapObject('დ','d'));
		this.swapArray.push(new swapObject('ე','e'));
		this.swapArray.push(new swapObject('ვ','v'));
		this.swapArray.push(new swapObject('ზ','z'));
		this.swapArray.push(new swapObject('თ','T'));
		this.swapArray.push(new swapObject('ი','i'));
		this.swapArray.push(new swapObject('კ','k'));
		this.swapArray.push(new swapObject('ლ','l'));
		this.swapArray.push(new swapObject('მ','m'));
		this.swapArray.push(new swapObject('ნ','n'));
		this.swapArray.push(new swapObject('ო','o'));
		this.swapArray.push(new swapObject('პ','p'));
		this.swapArray.push(new swapObject('ჟ','J'));
		this.swapArray.push(new swapObject('რ','r'));
		this.swapArray.push(new swapObject('ს','s'));
		this.swapArray.push(new swapObject('ტ','t'));
		this.swapArray.push(new swapObject('უ','u'));
		this.swapArray.push(new swapObject('ფ','f'));
		this.swapArray.push(new swapObject('ქ','q'));
		this.swapArray.push(new swapObject('ღ','R'));
		this.swapArray.push(new swapObject('ყ','y'));
		this.swapArray.push(new swapObject('შ','S'));
		this.swapArray.push(new swapObject('ჩ','C'));
		this.swapArray.push(new swapObject('ც','c'));
		this.swapArray.push(new swapObject('ძ','Z'));
		this.swapArray.push(new swapObject('წ','w'));
		this.swapArray.push(new swapObject('ჭ','W'));
		this.swapArray.push(new swapObject('ხ','x'));
		this.swapArray.push(new swapObject('ჯ','j'));
		this.swapArray.push(new swapObject('ჰ','h'));
		console.log('initialized');
	}

	unicodeTransformer.prototype.translateToLatin=function(GeoUnicodeString){
		var newString='';
		//console.log('began translation...');
		//console.log(GeoUnicodeString.length);
		for (var i=0;i<GeoUnicodeString.length;i++){
			//console.log(GeoUnicodeString.charAt(i));
			newString=newString+this.findLatinChar(GeoUnicodeString.charAt(i));
		}
		//console.log('ended translation with ');
		console.log(newString);
		return newString;
	}

	unicodeTransformer.prototype.translateToGeo=function(LatinUnicodeString){
		var newString='';
		//console.log('began translation...');
		//console.log(LatinUnicodeString.length);
		for (var i=0;i<LatinUnicodeString.length;i++){
			//console.log(LatinUnicodeString.charAt(i));
			newString=newString+this.findGeoChar(LatinUnicodeString.charAt(i));
		}
		//console.log('ended translation with ');
		console.log(newString);
		return newString;
	}

	unicodeTransformer.prototype.findLatinChar=function(GeoChar){
		
		for(var i=0;i<this.swapArray.length;i++){
			if(this.swapArray[i].Geo===GeoChar){
				//console.log('yeah '+this.swapArray[i].Latin);
				return this.swapArray[i].Latin;
			}
		}
		return GeoChar;
	}
	unicodeTransformer.prototype.findGeoChar=function(LatinChar){
		for(var i=0;i<this.swapArray.length;i++){
			if(this.swapArray[i].Latin===LatinChar){
				//console.log('yeah '+this.swapArray[i].Geo);
				return this.swapArray[i].Geo;
			}
		}
		return LatinChar;
	}






	var swapObject=function(Geo,Latin){
		this.Geo=Geo;
		this.Latin=Latin;
	}
}

module.exports.unicodeTransformer=unicodeTransformer;