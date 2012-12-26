

var HelloPlugin2 = {
    
    callNativeFunction2: function (success, fail, resultType) {
    	return cordova.exec(success, fail, "com.tricedesigns.HelloPlugin2", "nativeAction", [resultType]);
    }
};