#include <bits/stdc++.h>

using namespace std;
#define MAX 21
vector<bool> num(21, false);
int main(){
    ios_base::sync_with_stdio(0); cin.tie(0); cout.tie(0);
    int M; cin>>M; 
    while(M--){
        string cmd; cin>>cmd;
        int x;
        if(cmd=="add"){
            cin>>x; num[x]=true;
        }else if(cmd=="remove"){
            cin>>x; num[x]=false;
        }else if(cmd=="check"){
            cin>>x; cout<<num[x]<<"\n";
        }else if(cmd=="toggle"){
            cin>>x; num[x]=!num[x];    
        }else if(cmd=="all"){
            for(int i=1; i<MAX; i++) num[i]=true;    
        }else if(cmd=="empty"){
            for(int i=1; i<MAX; i++) num[i]=false;     
        }
    }
    return 0;
}