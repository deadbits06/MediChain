package com.example.medichain;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.Volley;

import org.json.JSONObject;

public class Login extends AppCompatActivity {

    // private RequestQueue requestQueue;
    private EditText user, p;
    private Button b;
    String passvalue ;
    String url="http://192.168.43.31:8080/login";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        user = (EditText) findViewById(R.id.user_name);
        p = (EditText) findViewById(R.id.password);
        b = (Button) findViewById(R.id.btn_login);

        b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                SharedPreferences sharedPref = getSharedPreferences("userinfo", Context.MODE_PRIVATE);
                SharedPreferences.Editor editor = sharedPref.edit();


                if(sharedPref.contains("sacred")) {

                    if(sharedPref.getBoolean("sacred",true)) {
                        Intent i= new Intent(Login.this, Navbar.class);
                        startActivity(i);
                        finish();
                    }
                }
                else {


                final String Username= user.getText().toString();
                final String Password= p.getText().toString();

                RequestQueue requestQueue = Volley.newRequestQueue(Login.this);
                String URL = "http://192.168.43.31:8080/login";
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("user", Username);
                    jsonObject.put("pass", Password);
                }
                catch (Exception e)
                {
                    e.printStackTrace();
                }
                final String requestBody = jsonObject.toString();
                //Log.i("Kaldon-net", requestBody);


                    ConnectionManager.sendData(requestBody, requestQueue, URL, new ConnectionManager.VolleyCallback() {
                        @Override
                        public void onSuccessResponse(String result) {
                            System.out.print("Bool" + result);

                            SharedPreferences sharedPref = getSharedPreferences("sacred", Context.MODE_PRIVATE);
                            SharedPreferences.Editor editor = sharedPref.edit();
                            //boolean check = sharedPref.getBoolean("abcd",false);


                            if (result.equals("1")) {

                                // Toast.makeText(Login.this, result, Toast.LENGTH_SHORT).show();

                                editor.putBoolean("sacred", true);
                                editor.putString("userid", user.getText().toString());
                                System.out.println("If condition"+sharedPref.contains("userid"));
                                editor.commit();

                                Intent i = new Intent(Login.this, Navbar.class);
                                String getrec = user.getText().toString();
                                String Name = user.getText().toString() ;

                              //  i.putExtra("pass" , Name ) ;
                                //Create the bundle
                                Bundle bundle = new Bundle();

                                //Add your data to bundle
                                bundle.putString("user", getrec);

                                //Add the bundle to the intent
                                i.putExtras(bundle);

                                //Fire that second activity

                                startActivity(i);
                                finish();
                            } else {

                                Toast.makeText(Login.this, "Invalid Credentials", Toast.LENGTH_SHORT).show();
                            }


                        }

                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Toast toast = Toast.makeText(Login.this,
                                    "Could not login, please try again." + error,
                                    Toast.LENGTH_LONG);

                            toast.show();
                        }


                    });
                }




            }
        });
    }
}
