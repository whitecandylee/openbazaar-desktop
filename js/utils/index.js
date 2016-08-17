// for now, putting one-off util functions that I don't know where
// else to put here.

import $ from 'jquery';

export function getGuid(handle, resolver) {
  const deferred = $.Deferred();
  let url = resolver || 'https://resolver.onename.com/v2/users/';

  if (!handle) {
    throw new Error('Please provide a handle.');
  }

  url = url.charAt(url.length - 1) !== '/' ? `${url}/` : url;
  url += handle;

  $.get(url).done((data) => {
    if (data && data[handle] && data[handle].profile && data[handle].profile.account) {
      const account = data[handle].profile.account.filter(
        (accountObject) => accountObject.service === 'openbazaar');

      deferred.resolve(account[0].identifier);
    } else {
      deferred.reject();
    }
  }).fail(() => {
    deferred.reject();
  });

  return deferred.promise();
}


// https://www.quora.com/How-do-I-split-a-JSON-array-on-different-rows-in-angularjs/answer/Steve-Schafer-2?srid=G5Pv
/*
 * Splits an array into rows (an array of arrays)
 */
 // TODO: !!!!! put check so items and itemsPerRow are required.
export function splitIntoRows(items, itemsPerRow) {
  const rslt = [];

  items.forEach((item, index) => {
    const rowIndex = Math.floor(index / itemsPerRow);
    const colIndex = index % itemsPerRow;

    if (!rslt[rowIndex]) {
      rslt[rowIndex] = [];
    }

    rslt[rowIndex][colIndex] = item;
  });

  return rslt;
}
