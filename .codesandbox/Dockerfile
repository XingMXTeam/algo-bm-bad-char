FROM ubuntu:latest

RUN apt-get update && apt-get install -y xdg-utils curl

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN npm install --global yarn

CMD ["/bin/bash"]
