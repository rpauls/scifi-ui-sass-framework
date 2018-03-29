module.exports = function(grunt) {

   grunt.initConfig({
        watch: {
            css: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass']
              }
        },
        myth: {
            compile: {
                expand: true,
                cwd: 'css',
                src: ['*.css', '!*.min.css'],
                dest: 'css',
                ext: '.css'
            },
            release: {
                files: {
                    'dist/scifiui.css': 'build/css/scifi-ui-framework.css'
                }
            }
        },
        sass: {
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    'build/css/scifi-ui-framework.css': 'src/scss/scifi-ui-framework.scss'
                }
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'index.html',
                        'build/css/*.css'
                    ]
                },
                options: {
                    watchTask: true,
                    server: './'
                }
            }
        },
        cssmin: {
            concat: {
                files: {
                    'dist/scifiui.css': ['build/css/scifi-ui-framework.css']
                }
            },
            minify: {
                expand: true,
                cwd: 'css',
                src: ['*.css', '!*.min.css'],
                dest: 'css',
                ext: '.min.css'
            },
            release: {
                expand: true,
                cwd: 'dist',
                src: ['*.css', '!*.min.css'],
                dest: 'dist',
                ext: '.min.css'
            }
        },
        processhtml: {
            dist: {
                options: {
                    process: true
                },
                files: {
                    'index.html': ['src/index.html']
                }
            }
        },
    });

    // Grunt plugins
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-myth');
    grunt.loadNpmTasks('grunt-processhtml');
    
    // Default task
    grunt.registerTask('default', [
        'sass',
        'myth',
        'cssmin:concat',
        'cssmin:minify',
        'cssmin:release',
        'processhtml'
    ]);

    // BrowserSync with scss watcher task
    grunt.registerTask('sync', ['browserSync', 'watch']);
};