package com.tricedesigns;

import java.util.ArrayList;
import java.util.List;
import java.util.ListIterator;
import java.util.TreeSet;
import java.util.concurrent.atomic.AtomicBoolean;

import android.annotation.SuppressLint;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Canvas;
import android.os.Handler;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.TextView;

import com.pfe.TA_.R;

@SuppressLint("DrawAllocation")
public class AugmentedView extends View {
	private static final AtomicBoolean drawing = new AtomicBoolean(false);

	private static final Radar radar = new Radar();
	private static Radar2 radar2 =null;
	 private ProgressDialog myProgressDialog;
	private static int typeView;
	private static final float[] locationArray = new float[3];
	private static final List<Marker> cache = new ArrayList<Marker>(); 
	private static final TreeSet<Marker> updated = new TreeSet<Marker>();
	private static final int COLLISION_ADJUSTMENT = 100;
	private static  View view;
	final Handler uiThreadCallback = new Handler();

	public AugmentedView(Context context,int type) {
		super(context);
		radar2 = new Radar2(context);
		this.typeView=type;
		view= View.inflate(context, R.layout.main, null);
	/*	LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (layoutInflater != null) {
         view = layoutInflater.inflate(R.layout.main,context, null);

        }*/


	}

	@Override
	protected void onDraw(Canvas canvas) {
		if (canvas==null) return;

		if (drawing.compareAndSet(false, true)) { 
			List<Marker> collection = ARData.getMarkers();

			cache.clear();
			for (Marker m : collection) {
				m.update(canvas, 0, 0);
				if (m.isOnRadar()) cache.add(m);
			}
			collection = cache;

			if (AugmentedActivity.useCollisionDetection) adjustForCollisions(canvas,collection);

			ListIterator<Marker> iter = collection.listIterator(collection.size());
			while (iter.hasPrevious()) {
				Marker marker = iter.previous();
				marker.draw(canvas);
			}
			if (AugmentedActivity.showRadar) {
				radar.draw(canvas);
			
				if(typeView==1){
					radar2.draw(canvas);
					

				}

			}

			drawing.set(false);
		}
	}

	private static void adjustForCollisions(Canvas canvas, List<Marker> collection) {
		updated.clear();
		for (Marker marker1 : collection) {
			if (updated.contains(marker1) || !marker1.isInView()) continue;

			int collisions = 1;
			for (Marker marker2 : collection) {
				if (marker1.equals(marker2) || updated.contains(marker2) || !marker2.isInView()) continue;

				if (marker1.isMarkerOnMarker(marker2)) {
					marker2.getLocation().get(locationArray);
					float y = locationArray[1];
					float h = collisions*COLLISION_ADJUSTMENT;
					locationArray[1] = y+h;
					marker2.getLocation().set(locationArray);
					marker2.update(canvas, 0, 0);
					collisions++;
					updated.add(marker2);
				}
			}
			updated.add(marker1);
		}
	}
	@Override
	public boolean onTouchEvent(MotionEvent event) {
		// TODO Auto-generated method stub
		 
		 final int action = event.getAction();
		    final float x = event.getX();
		    
		    final float y = event.getY();
		   
		   
		    if((x<radar2.PAD_X+160&&x>radar2.PAD_X)&&(y<radar2.PAD_Y+160&&y>radar2.PAD_Y)){
		    	myProgressDialog = ProgressDialog.show(getContext(),
		                "", "Chargement...", true); 
		    	//Toast.makeText(getContext(), "hhhhhhh", Toast.LENGTH_SHORT).show();
		    	 final Runnable runInUIThread = new Runnable() {
		     	    public void run() {
		     	   	Intent i = new Intent(getContext(), MainActivity2.class);
			    	getContext().startActivity(i);
		     	    }
		     	  };
		  
		     	  new Thread() {
		     		    @Override public void run() {
		     		     
		     		     
		     		      uiThreadCallback.post(runInUIThread);
		     		     myProgressDialog.dismiss();
		     		    }
		     		  }.start();
		    
		    }
		
		return super.onTouchEvent(event);
	}
}