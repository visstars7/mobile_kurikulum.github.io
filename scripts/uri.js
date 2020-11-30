function BASE_URL(path) {

    // Deveoptment
    var pathname = '/mobile_kurikulum.github.io'
    return window.location.origin + pathname + '/' + path;

    // // production
    // var pathname = '/'
    // console.log(window.location.origin + pathname + path);
}