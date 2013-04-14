(function($) {

  $('.set1').find('div').click(function(e) {
    var att = $(this).attr('data-id');
    $(this).addClass('mine');
    if (att === "1" ||
        att === "2" ||
        att === "5" ||
        att === "6" ||
        att === "9" ||
        att === "10" ||
        att === "13" ||
        att === "14") {
      $(this).parents('.feature-set').find('.set2').find('div').first().html($(this).html()).attr('data-id',att).addClass('mine');
    } else {
      $(this).parents('.feature-set').find('.set2').find('div').last().html($(this).html()).attr('data-id',att).addClass('mine');
    }
  });

  $('.set2').find('div').click(function(e) {
    var att = $(this).attr('data-id');
    if (att === "1" ||
        att === "2" ||
        att === "3" ||
        att === "4" ||
        att === "9" ||
        att === "10" ||
        att === "11" ||
        att === "12") {
      $(this).parents('.feature-set').find('.set3').find('div').html($(this).html()).attr('data-id',att).addClass('mine');
    } else {
      $(this).parents('.feature-set').find('.set3').find('div').html($(this).html()).attr('data-id',att).addClass('mine');
    }
    $(this).parents('.feature-set').find('.next').show();
  });

  $('.set3').find('div').click(function(e) {
    var att = $(this).attr('data-id');
    if (att === "1" ||
        att === "2" ||
        att === "3" ||
        att === "4" ||
        att === "5" ||
        att === "6" ||
        att === "7" ||
        att === "8") {
      $(this).parents('.bracket').find('.final-set').find('div').first().html($(this).html()).attr('data-id',att).addClass('mine');
    } else {
      $(this).parents('.bracket').find('.final-set').find('div').last().html($(this).html()).attr('data-id',att).addClass('mine');
    }
  });

  $('.next').click(function(e) {
    if ($(this).attr('class').indexOf('dimming') !== -1) {
      $('.feature-dimming').hide();
      $('.feature-sensorandtech').show();
    } else if ($(this).attr('class').indexOf('sensorandtech') !== -1) {
      $('.feature-sensorandtech').hide();
      $('.feature-controlfeatures').show();
    } else if ($(this).attr('class').indexOf('controlfeatures') !== -1) {
      $('.feature-controlfeatures').hide();
      $('.feature-communication').show();
    } else if ($(this).attr('class').indexOf('communication') !== -1) {
      $('.feature-communication').hide();
      $('.final-set').show();
    }
  });

  $('.final-set').find('div:first-child').click(function(e) {
    var att = $(this).attr('data-id');
    $(this).parents('.bracket').find('.final-set').find('div:nth-child(2)').html($(this).html()).attr('data-id',att).addClass('mine');
    setTimeout(function() {
      window.location = '/final?id='+att;
    },1000);
  });

  $('.final-set').find('div:last-child').click(function(e) {
    var att = $(this).attr('data-id');
    $(this).parents('.bracket').find('.final-set').find('div:nth-child(2)').html($(this).html()).attr('data-id',att).addClass('mine');
    setTimeout(function() {
      window.location = '/final?id='+att;
    },1000);
  });
})(jQuery);