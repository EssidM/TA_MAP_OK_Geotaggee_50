package com.tricedesigns;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.pfe.TA_.R;



import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Color;

public class NodesDataSource extends NetworkDataSource {
	private static final String URL = "http://10.0.2.6:8888/nodesselection.php";

	private static Bitmap icon = null;

	public NodesDataSource(Resources res) {
		if (res == null)
			throw new NullPointerException();

		createIcon(res);
	}

	protected void createIcon(Resources res) {
		if (res == null)
			throw new NullPointerException();

		icon = BitmapFactory.decodeResource(res, R.drawable.orange);
	}

	@Override
	public String createRequestURL(double lat, double lon, double alt,
			float radius, String locale) {
		return URL;
	}

	@Override
	public List<Marker> parse(String url) {

		
		if (url == null)
			throw new NullPointerException();

		InputStream stream = null;
		stream = getHttpGETInputStream(url);
		if (stream == null)
			throw new NullPointerException();

		String string = null;
		string = getHttpInputString(stream);

		if (string == null)
			throw new NullPointerException();

		JSONObject json = null;
		try {
			json = new JSONObject(string);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		if (json == null)
			throw new NullPointerException();
		return parse(json);
	}

	@Override
	public List<Marker> parse(JSONObject root) {
		if (root == null)
			throw new NullPointerException();

		JSONObject jo = null;
		JSONArray dataArray = null;
		List<Marker> markers = new ArrayList<Marker>();

		try {
			if (root.has("results"))
				dataArray = root.getJSONArray("results");
			if (dataArray == null)
				return markers;
			int top = Math.min(MAX, dataArray.length());
			for (int i = 0; i < top; i++) {
				jo = dataArray.getJSONObject(i);
				Marker ma = processJSONObject(jo);
				if (ma != null)
					markers.add(ma);
			}
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return markers;
	}

	private Marker processJSONObject(JSONObject jo) {
		if (jo == null)
			throw new NullPointerException();

		Marker ma = null;
		try {
			Double lat = null, lon = null;
			String user = jo.getString("name");
			lat = jo.getDouble("latitude");
			lon = jo.getDouble("longitude");

			ma = new IconMarker(user + ": " + jo.getString("description"), lat,
					lon, 0, Color.RED, icon);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ma;
	}
}
