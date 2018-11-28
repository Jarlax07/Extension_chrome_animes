function callback() {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  }
}

$(document).ready(function() {
  $('.tabs').tabs();
});
$(document).ready(function() {
  $('.fixed-action-btn').floatingActionButton();
});

$("#refresh")[0].onclick = function() {
  console.log("sending message");
  chrome.runtime.sendMessage({
    request: "refreshWatching"
  }, function(response) {});
};

function store_to_watch_list(to_watch_list) {
  console.log("storing to watch list");
  let nb = sizeof(to_watch_list) / chrome.storage.sync.QUOTA_BYTES_PER_ITEM;
  if (nb > 3) {
    let div = Math.floor(to_watch_list.length / 4);
    if (4 * div < to_watch_list.length) {
      chrome.storage.sync.set({
        'nb_to_watch_list': 5,
        'to_watch_list1': to_watch_list.slice(0, div),
        'to_watch_list2': to_watch_list.slice(div, 2 * div),
        'to_watch_list3': to_watch_list.slice(2 * div, 3 * div),
        'to_watch_list4': to_watch_list.slice(3 * div, 4 * div),
        'to_watch_list5': to_watch_list.slice(4 * div, to_watch_list.length)
      }, function() {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
          chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        }
      });
    } else {
      chrome.storage.sync.set({
        'nb_to_watch_list': 4,
        'to_watch_list1': to_watch_list.slice(0, div),
        'to_watch_list2': to_watch_list.slice(div, 2 * div),
        'to_watch_list3': to_watch_list.slice(2 * div, 3 * div),
        'to_watch_list4': to_watch_list.slice(3 * div, 4 * div)
      }, function() {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
          chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        }
      });
    }
  } else if (nb > 2) {
    let div = Math.floor(to_watch_list.length / 3);
    if (3 * div < to_watch_list.length) {
      chrome.storage.sync.set({
        'nb_to_watch_list': 4,
        'to_watch_list1': to_watch_list.slice(0, div),
        'to_watch_list2': to_watch_list.slice(div, 2 * div),
        'to_watch_list3': to_watch_list.slice(2 * div, 3 * div),
        'to_watch_list4': to_watch_list.slice(3 * div, to_watch_list.length)
      }, function() {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
          chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        }
      });
    } else {
      chrome.storage.sync.set({
        'nb_to_watch_list': 3,
        'to_watch_list1': to_watch_list.slice(0, div),
        'to_watch_list2': to_watch_list.slice(div, 2 * div),
        'to_watch_list3': to_watch_list.slice(2 * div, 3 * div)
      }, function() {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
          chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        }
      });
    }

  } else if (nb > 1) {
    let div = Math.floor(to_watch_list.length / 2);
    if (2 * div < to_watch_list.length) {
      chrome.storage.sync.set({
        'nb_to_watch_list': 3,
        'to_watch_list1': to_watch_list.slice(0, div),
        'to_watch_list2': to_watch_list.slice(div, 2 * div),
        'to_watch_list3': to_watch_list.slice(2 * div, to_watch_list.length)
      }, function() {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
          chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        }
      });
    } else {
      chrome.storage.sync.set({
        'nb_to_watch_list': 2,
        'to_watch_list1': to_watch_list.slice(0, div),
        'to_watch_list2': to_watch_list.slice(div, 2 * div)
      }, function() {
        if (chrome.runtime.lastError) {
          console.log(chrome.runtime.lastError);
        } else {
          chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
          chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
        }
      });
    }

  } else {
    chrome.storage.sync.set({
      'nb_to_watch_list': 1,
      'to_watch_list1': to_watch_list
    }, function() {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      } else {
        chrome.browserAction.setBadgeText({text: to_watch_list.length.toString()});
        chrome.browserAction.setBadgeBackgroundColor({color: '#4688F1'});
      }
    });
  }
}

function display_to_watch_list() {

  let card = document.querySelector("#card_anime");
  var list_episode = $("#list_episode");
  // list_episode[0].childNodes.forEach(function(elem) {
  //   elem.remove;
  // });
  var to_watch_list = [];
  chrome.storage.sync.get([
    "nb_to_watch_list",
    "to_watch_list1",
    "to_watch_list2",
    "to_watch_list3",
    "to_watch_list4",
    "to_watch_list5"
  ], function(result) {
    if (chrome.runtime.lastError) 
      console.log(chrome.runtime.lastError);
    else {
      if (result.nb_to_watch_list >= 1) {
        to_watch_list = to_watch_list.concat(result.to_watch_list1);
      }
      if (result.nb_to_watch_list >= 2) {
        to_watch_list = to_watch_list.concat(result.to_watch_list2);
      }
      if (result.nb_to_watch_list >= 3) {
        to_watch_list = to_watch_list.concat(result.to_watch_list3);
      }
      if (result.nb_to_watch_list >= 4) {
        to_watch_list = to_watch_list.concat(result.to_watch_list4);
      }
      if (result.nb_to_watch_list >= 5) {
        to_watch_list = to_watch_list.concat(result.to_watch_list5);
      }

      to_watch_list.reverse();
      to_watch_list.forEach(function(elem) {

        var clone = document.importNode(card.content, true);
        var img = clone.querySelector("img");
        if (elem.img) 
          img.setAttribute("src", elem.img);
        var description = clone.querySelector(".description");
        description.textContent = elem.title;
        var remove = clone.querySelector(".remove");
        remove.onclick = function() {
          to_watch_list.forEach(function(e2, index) {
            if (e2.title == elem.title) {
              to_watch_list.splice(index, 1);
              to_watch_list.reverse();
              store_to_watch_list(to_watch_list);
              to_watch_list.reverse();
            }

          });
        };

        var watch = clone.querySelector(".watch");
        watch.onclick = function() {
          chrome.tabs.create({'url': elem.link});
        }

        list_episode.append(clone);

      });

    }
  });

}

//TODO take card as argument
function display_watching_list() {
  let card = document.querySelector("#card_watching");
  var div = $("#watching_list");

  chrome.storage.sync.get([
    "nb_watching_anime_list",
    "watching_anime_list1",
    "watching_anime_list2",
    "watching_anime_list3",
    "watching_anime_list4",
    "watching_anime_list5"
  ], function(result) {
    if (chrome.runtime.lastError) 
      console.log(chrome.runtime.lastError);
    else {

      let watching_anime_list = [];
      if (result.nb_watching_anime_list >= 1 && result.watching_anime_list1) {
        watching_anime_list = watching_anime_list.concat(result.watching_anime_list1);
      }
      if (result.nb_watching_anime_list >= 2 && result.watching_anime_list2) {
        watching_anime_list = watching_anime_list.concat(result.watching_anime_list2);
      }
      if (result.nb_watching_anime_list >= 3 && result.watching_anime_list3) {
        watching_anime_list = watching_anime_list.concat(result.watching_anime_list3);
      }
      if (result.nb_watching_anime_list >= 4 && result.watching_anime_list4) {
        watching_anime_list = watching_anime_list.concat(result.watching_anime_list4);
      }
      if (result.nb_watching_anime_list >= 5 && result.watching_anime_list5) {
        watching_anime_list = watching_anime_list.concat(result.watching_anime_list5);
      }

      watching_anime_list.forEach(function(elem) {

        var clone = document.importNode(card.content, true);
        var img = clone.querySelector("img");
        if (elem.image) 
          img.setAttribute("src", elem.image);
        var title = clone.querySelector(".card-title");
        title.textContent = elem.title;
        var description = clone.querySelector(".description");
        description.textContent = elem.description;

        var more = clone.querySelector(".more");
        more.onclick = function() {
          chrome.tabs.create({'url': elem.link});
        }

        div.append(clone);
      });
    }
  });

}

var card = document.querySelector("#card_anime");
display_to_watch_list(card);
card = document.querySelector("#card_watching");
display_watching_list(card);

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (changes.nb_to_watch_list || changes.to_watch_list1 || changes.to_watch_list2 || changes.to_watch_list3 || changes.to_watch_list4 || changes.to_watch_list5) {
    console.log(changes);
    $("#list_episode")[0].textContent = "";
    display_to_watch_list();

  } else if (changes.nb_watching_anime_list || changes.watching_anime_list1 || changes.watching_anime_list2 || changes.watching_anime_list3 || changes.watching_anime_list4 || changes.watching_anime_list5) {
    $("#watching_list")[0].textContent = "";
    display_watching_list();
  }
  // window.location.reload();
});
