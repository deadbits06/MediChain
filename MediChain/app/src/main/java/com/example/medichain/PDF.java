package com.example.medichain;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.ProgressBar;

import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

import es.voghdev.pdfviewpager.library.RemotePDFViewPager;
import es.voghdev.pdfviewpager.library.adapter.PDFPagerAdapter;
import es.voghdev.pdfviewpager.library.remote.DownloadFile;

public class PDF extends AppCompatActivity implements DownloadFile.Listener{

    PDFPagerAdapter adapter;

    RemotePDFViewPager remotePDFViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pdf);
        RequestQueue requestQueue = Volley.newRequestQueue(PDF.this);
        String URL = "http://192.168.43.31:8080/testpdf";
        remotePDFViewPager =
                new RemotePDFViewPager(this, "http://www.cals.uidaho.edu/edComm/curricula/CustRel_curriculum/content/sample.pdf", this);

//        JSONObject jsonObject = new JSONObject();
//        final String requestBody = jsonObject.toString();
//        http://drive.google.com/viewerng/viewer?embedded=true&url=http://192.168.43.31:8080/testpdf
//        ConnectionManager.sendData(requestBody, requestQueue, URL, new ConnectionManager.VolleyCallback() {
//            @Override
//            public void onSuccessResponse(String result) {
//
//                //String URL = "http://192.168.43.31:8080/testpdf";
//
//                WebView webView = findViewById(R.id.webView);
//                final ProgressBar progressBar = findViewById(R.id.progressBar);
//
//                progressBar.setVisibility(View.VISIBLE);
//
//                // String url = "" ;
//
//                // String finalurl = "http://drive.google.com/viewerng/viewer?embedded=true & url="+url ;
//
//                webView.getSettings().setJavaScriptEnabled(true);
//
//                webView.getSettings().setBuiltInZoomControls(true);
//
//                webView.setWebChromeClient(new WebChromeClient() {
//
//                    @Override
//                    public void onProgressChanged(WebView view, int newProgress) {
//                        super.onProgressChanged(view, newProgress);
//
//                        getSupportActionBar().setTitle("Loading....");
//
//
//                        if (newProgress == 100) {
//
//                            progressBar.setVisibility(View.GONE);
//                            getSupportActionBar().setTitle(R.string.app_name);
//
//                        }
//                    }
//                });
//
//
//                webView.loadUrl(result);
//
//
//            }
//
//            @Override
//            public void onErrorResponse(VolleyError error) {
//
//            }
//        });
//
//
//
//
//
//
//
//
//







        WebView webView = findViewById(R.id.webView);
        final ProgressBar progressBar = findViewById(R.id.progressBar);

        progressBar.setVisibility(View.VISIBLE);

        //String url = "http://firebasestorage.googleapis.com/v0/b/pdfupload-56d4c.appspot.com/o/scan0002.pdf?alt=media&token=500e24d9-f705-4c87-a76f-c14d25ef96a8" ;

        String finalurl = "http://drive.google.com/viewerng/viewer?embedded=true&url="+URL ;

        webView.getSettings().setJavaScriptEnabled(true);

        webView.getSettings().setBuiltInZoomControls(true);

        webView.setWebChromeClient(new WebChromeClient(){

            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);

                getSupportActionBar().setTitle("Loading....");


                if (newProgress == 100){

                    progressBar.setVisibility(View.GONE);
                    getSupportActionBar().setTitle(R.string.app_name);

                }
            }
        });


        webView.loadUrl(finalurl);
    }

    @Override
    public void onSuccess(String url, String destinationPath) {
        // That's the positive case. PDF Download went fine

        adapter = new PDFPagerAdapter(this, "AdobeXMLFormsSamples.pdf");
        remotePDFViewPager.setAdapter(adapter);
        setContentView(remotePDFViewPager);
    }

    @Override
    public void onFailure(Exception e) {
        // This will be called if download fails
    }

    @Override
    public void onProgressUpdate(int progress, int total) {
        // You will get download progress here
        // Always on UI Thread so feel free to update your views here
    }

}
