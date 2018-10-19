rmdir public /s
mkdir public
mkdir public\assets
mkdir public\css
mkdir public\javascript

robocopy assets .\public\assets /e
robocopy css .\public\css /e
robocopy javascript .\public\javascript /e
