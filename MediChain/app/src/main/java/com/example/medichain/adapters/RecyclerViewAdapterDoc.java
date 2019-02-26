package com.example.medichain.adapters;

import android.content.Context;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.medichain.PDF;
import com.example.medichain.model.Documents;
import com.example.medichain.R ;

import java.util.List;


public class RecyclerViewAdapterDoc extends RecyclerView.Adapter<RecyclerViewAdapterDoc.MyViewHolderDoc> {

    private Context mContext ;
    private List<Documents> mData ;

    public RecyclerViewAdapterDoc(Context mContext, List<Documents> mData) {
        this.mContext = mContext;
        this.mData = mData;
    }

    @NonNull
    @Override
    public MyViewHolderDoc onCreateViewHolder(@NonNull ViewGroup parent, final int i) {

        View view ;
        LayoutInflater inflater = LayoutInflater.from(mContext);
        view = inflater.inflate(R.layout.doc_row_item, parent , false) ;


        final MyViewHolderDoc viewHolder = new MyViewHolderDoc(view) ;

        viewHolder.view_container.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in= new Intent(mContext, PDF.class);

                in.putExtra("doc_url", mData.get(i).getDocument_url());

                mContext.startActivity(in);

            }
        });


        return new MyViewHolderDoc(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolderDoc myViewHolderDoc, int position) {

        myViewHolderDoc.tv_tname.setText(mData.get(position).getTreatment_name());
        myViewHolderDoc.tv_docurl.setText(mData.get(position).getDocument_url());

    }


    @Override
    public int getItemCount() {


        return mData.size();
    }



    public static class MyViewHolderDoc extends RecyclerView.ViewHolder {

        TextView tv_tname ;
        TextView tv_docurl ;

        LinearLayout view_container ;

        public MyViewHolderDoc(View itemView){

            super(itemView);

            view_container = itemView.findViewById(R.id.docContainer);
            tv_tname = itemView.findViewById(R.id.treatment_name) ;
            tv_docurl = itemView.findViewById(R.id.doc_url);


        }

    }
}
