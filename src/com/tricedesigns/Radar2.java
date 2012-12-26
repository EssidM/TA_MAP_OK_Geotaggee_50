package com.tricedesigns;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;
import android.widget.Toast;

public class Radar2   {
    public static final float RADIUS = 80;
    
    private static final int LINE_COLOR = Color.argb(150,0,0,220);
    public static final float PAD_X = 10;
    public static  float PAD_Y = 200;
    private static final int RADAR_COLOR = Color.argb(200, 0, 0, 200);
    private static final int TEXT_COLOR = Color.rgb(255,255,255);
    private static final int TEXT_SIZE = 16;

    private static ScreenPositionUtility leftRadarLine = null;
    private static ScreenPositionUtility rightRadarLine = null;
    private static PaintablePosition leftLineContainer = null;
    private static PaintablePosition rightLineContainer = null;
    private static PaintablePosition circleContainer = null;
    
    private static PaintableRadarPoints radarPoints = null;
    private static PaintablePosition pointsContainer = null;
    
    private static PaintableText paintableText = null;
    private static PaintablePosition paintedContainer = null;

    public Radar2(Context ctx) {
        if (leftRadarLine==null) leftRadarLine = new ScreenPositionUtility();
        if (rightRadarLine==null) rightRadarLine = new ScreenPositionUtility();
        WindowManager wm = (WindowManager) ctx.getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();
        
        PAD_Y=display.getHeight()-270;
  
    
    }

    public void draw(Canvas canvas) {
    	if (canvas==null) throw new NullPointerException();

    	PitchAzimuthCalculator.calcPitchBearing(ARData.getRotationMatrix());
        ARData.setAzimuth(PitchAzimuthCalculator.getAzimuth());
        ARData.setPitch(PitchAzimuthCalculator.getPitch());
        
        drawRadarCircle(canvas);
        drawRadarText(canvas);
        
    }
    
    private void drawRadarCircle(Canvas canvas) {
    	if (canvas==null) throw new NullPointerException();
    	
        if (circleContainer==null) {
            PaintableCircle paintableCircle = new PaintableCircle(RADAR_COLOR,RADIUS,true);
            circleContainer = new PaintablePosition(paintableCircle,PAD_X+RADIUS,PAD_Y+RADIUS,0,1);
        }
        circleContainer.paint(canvas);
        
    }
    private void drawRadarText(Canvas canvas) {
    	if (canvas==null) throw new NullPointerException();
        int range = (int) (ARData.getAzimuth() / (360f / 16f)); 
        String  dirTxt = "+\nAjouter votre photo";
        radarText(  canvas, 
                    dirTxt, 
                    (PAD_X + RADIUS), 
                    (PAD_Y + RADIUS), 
                    true
                 );
        
      
    }
    
    private void radarText(Canvas canvas, String txt, float x, float y, boolean bg) {
    	if (canvas==null || txt==null) throw new NullPointerException();
    	
        if (paintableText==null) paintableText = new PaintableText(txt,TEXT_COLOR,TEXT_SIZE,bg);
        else paintableText.set(txt,TEXT_COLOR,TEXT_SIZE,bg);
        
        if (paintedContainer==null) paintedContainer = new PaintablePosition(paintableText,x,y,0,1);
        else paintedContainer.set(paintableText,x,y,0,1);
        
        paintedContainer.paint(canvas);
    }
	
	

	

	

	
	
   
    
}