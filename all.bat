rmdir public /s /q

mkdir public
mkdir public\assets
mkdir public\css
mkdir public\javascript

robocopy assets .\public\assets /e
robocopy css .\public\css /e
robocopy javascript .\public\javascript /e
copy index.html .\public\index.html

firebase serve