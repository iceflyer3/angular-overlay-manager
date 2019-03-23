# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.3] - 2019-03-23
### Fixed
Fixed a bug that was preventing non-bootstrap style modal overlays from receiving click events and the manager being slightly more opinionated about the dimesions of an overlay than it should be. 

### Added
Added several new pre-defined overlay examples to the demo application. These are not customizable as the original one is but should allow for better testing and demonstration of a wider range of use cases. 

## [2.1.2] - 2019-03-18
### Fixed
Fixed a bug that was preventing the dynamic components from data binding data passed to them in their template. 

## [2.1.1] - 2019-02-24
### Added
The `AomOverlayRef` that is returned when opening an overlay now supports a `forceCancel()` function. This is useful for some overlays (such as those that only serve informational purposes such as to provide status information) and thus might need to close themselves without any user interaction.

For example, suppose we are displaying status information related to an operation the user has performed (such as loading, saving, deleting, updating, etc...) in a snackbar. The user will not and should not interact with these types of overlays as they are only to let the user know that something is happening. If an error occurs during one of these statuses you may wish to show a new overlay with details of the error. In order to do so you would have to forcibly cancel the status overlay because you are not allowed to open more than one overlay at a time and the user cannot interact with it to close it.


## [2.0.1] - 2019-02-21
### Changed
Derped and forgot to update the Angular version used in the readme. npm won't let you upload the same version twice so here we are. This is exactly the same as version 2.0.0 except the readme now states the correct version of Angular that is in use. We'll be more careful about this going forward. You live and you learn.

## [2.0.0] - 2019-02-21
### Changed
Now uses and supports Angular 7.x

## [1.0.0] - 2019-01-27
Initial release



