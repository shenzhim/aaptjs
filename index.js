'use strict';

require('shelljs/global');
const os = require('os');
const path = require('path');
const aapt = path.join(__dirname, 'bin', os.platform(), 'aapt');

exports function list(modifiers, apkfilePath, callback) {
	callback = callback || function () {};
	return new Promise((resolve, reject) => {
		exec(`${aapt} l ${modifiers} ${apkfilePath}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}

exports function dump(modifiers, what, apkfilePath, callback) {
	callback = callback || function () {};
	return new Promise((resolve, reject) => {
		exec(`${aapt} d ${modifiers} ${what} ${apkfilePath}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
				callback(null, stdout);
      }
		})
	}
}

exports function package(command, callback) {
	callback = callback || function () {};
	return new Promise((resolve, reject) => {
		exec(`${aapt} p ${command}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}

exports function remove(modifiers, apkfilePath, files, callback) {
	callback = callback || function () {};
	if (!Array.isArray(files)) {
		files = [files]
	}
	const removeFiles = files.join(' ')

	return new Promise((resolve, reject) => {
		exec(`${aapt} r ${modifiers} ${apkfilePath} ${removeFiles}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}

exports function add(modifiers, apkfilePath, files, callback) {
	callback = callback || function () {};
	if (!Array.isArray(files)) {
		files = [files]
	}
	const addFiles = files.join(' ')

	return new Promise((resolve, reject) => {
		exec(`${aapt} a ${modifiers} ${apkfilePath} ${addFiles}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}

exports function crunch(modifiers, resource, outputFolder, callback) {
	callback = callback || function () {};
	if (!Array.isArray(resource)) {
		resource = [resource]
	}
	const resourceSources = resource.join(' ')

	return new Promise((resolve, reject) => {
		exec(`${aapt} c ${modifiers} -S ${resourceSources} -C ${outputFolder}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}

exports function singleCrunch(modifiers, inputFile, outputfile, callback) {
	callback = callback || function () {};
	return new Promise((resolve, reject) => {
		exec(`${aapt} s ${modifiers} -i ${inputFile} -o ${outputfile}`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}

exports function version(callback) {
	callback = callback || function () {};
	return new Promise((resolve, reject) => {
		exec(`${aapt} v`, (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr);
        callback(stderr, null);
      } else {
      	resolve(stdout);
      	callback(null, stdout);
      }
		})
	}
}