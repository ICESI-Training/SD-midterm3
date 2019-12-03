from app import app
import logging

logg = logging
logg.basicConfig(level=logging.INFO)

if __name__ == '__main__':
    app.run(port=5000, use_reloader=False, threaded=False, debug=True)
    app.add_api('openapi.yaml')
    cors = CORS(app.app)
    app.app.config['CORS_HEADERS'] = 'Content-Type'
    app.debug=True
