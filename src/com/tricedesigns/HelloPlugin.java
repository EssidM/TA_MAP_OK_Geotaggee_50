package com.tricedesigns;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;

import android.content.Context;
import android.content.Intent;

public class HelloPlugin extends Plugin {

	@Override
	public PluginResult execute(String action, JSONArray data, String callbackId) {

		Intent intent = new Intent((Context) ctx, MainActivity.class);
		((Context) ctx).startActivity(intent);

		return null;
	}

}
