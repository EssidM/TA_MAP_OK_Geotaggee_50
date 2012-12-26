package com.tricedesigns;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;

import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class HelloPlugin2 extends Plugin {

	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {
		Log.i("hhhhhhhhhhhhhhhh", "test");
		Intent intent = new Intent((Context) ctx, MainActivity3.class);
		Log.i("hhhhhhhhhhhhhhhh", "test");
		((Context) ctx).startActivity(intent);
      Log.i("hhhhhhhhhhhhhhhh", "test");
		return null;
	}

}
