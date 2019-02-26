package com.example.medichain;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SharedPreferences sharedPref = getSharedPreferences("userinfo", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        System.out.println("condition"+sharedPref.contains("userid"));

        if (sharedPref.contains("sacred")) {
            System.out.println("Main ke andar");
            if (sharedPref.getBoolean("sacred", true)) {
                Intent i = new Intent(MainActivity.this, Navbar.class);
                startActivity(i);
                finish();
            }
        } else {


            Intent intent = new Intent(this, Login.class);
            startActivity(intent);
            finish();
        }
    }
}
