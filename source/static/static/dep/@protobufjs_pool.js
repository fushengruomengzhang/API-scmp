var b=p;function p(f,n,t){var a=t||8192,u=a>>>1,l=null,r=a;return function(o){if(o<1||o>u)return f(o);r+o>a&&(l=f(a),r=0);var v=n.call(l,r,r+=o);return r&7&&(r=(r|7)+1),v}}export{b as p};
