package com.tricedesigns;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class MainActivity2 extends DroidGap {
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		super.loadUrl("file:///android_asset/www/ajoutPG.html");
	}
}