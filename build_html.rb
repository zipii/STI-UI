#!/usr/bin/env ruby

#require 'commander/import'

require 'tilt'
require 'slim'
require 'kramdown'

require 'pp'

module Kramdown
  module Converter
    class Page < Html
    end
  end
end

def walk(path, &process_file)
  Dir.foreach(path) do |file|
    new_path = File.join(path, file)
    if file == '.' or file == '..'
      next
    elsif File.directory?(new_path)
      walk(new_path, &process_file)
    else
      yield(path, file)
    end
  end
end

def build_all
  Dir.foreach('content') do |language|
    next if language == '.' or language == '..'
    # Process.fork {
      build_site language, 'site'
      build_site language, 'questionnaire'
    # }
  end
end

def create_dir(path)
  parts = path.split('/')
  parts.each_with_index do |part, i|
    parts_path = parts[0..i].join('/')
    (Dir.mkdir parts_path) rescue Errno::EEXIST
  end
end

def render_path(*path_parts)
  path = path_parts.map do |part|
    if part.length <= 1
      nil
    elsif part[-1] == '/'
      part
    else
      "#{part}/"
    end
  end
  path.join
end

def build_site(language, description)
  build_path    = render_path "build", language, description
  content_path  = render_path "content", language, description
  template_path = render_path "layouts", language, description

  walk(content_path) do |path, content_file|
    relative_path      = render_path path.split('/')[3..-1]
    content_file_path  = render_path content_path, relative_path
    target_path        = render_path build_path, relative_path

    template_file = content_file.split('.')[0..-2].push('slim').join('.')

    create_dir target_path

    # get context from markdown
    content_kramdown = File.read File.join(content_file_path, content_file)
    context = Kramdown::Document.new(content_kramdown)

    pp context

    # create markup from context
    #Slim::Template.new("#{template_path}/#{relative_path}/#{template_file}.slim")

    # write output to newly created public folder
    #create_dir "#{build_path}#{relative_path}"
    #render(template_file)
  end
end

build_all


# run this script from gulp
# create client side assets, copy into assets directory
# run from travis (on master commit)
