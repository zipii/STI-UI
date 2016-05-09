require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/build/site'

run Sinatra::Application
