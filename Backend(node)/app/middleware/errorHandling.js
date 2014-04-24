module.exports = function(app, router){
	/// catch 404 and forwarding to error handler
	router.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	/// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		router.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.json({
				message: err.message,
				error: err
			});
		});
	} else {
		// production error handler
		// no stacktraces leaked to user
		router.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.json({
				message: err.message,
				error: {}
			});
		});
	}

	return router;
};
