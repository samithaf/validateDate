validateDate
============

Multi-format date validate plug-in for jQuery

Dependecies:
jQuery 1.9+

Supported date formats:
  <ul>
  <li>1/1/12</li>
  <li>01/01/2012</li>
  <li>Jan 1 12</li>
  <li>Jan 1 2012</li>
  <li>1.1.12</li>
  <li>1-1-12</li>
  <li>1 Jan 12</li>
  <li>January 1 2012</li>
  <li>Jan 1</li>
  <li>1 Jan</li>
  <li>1st Jan</li>
  </ul>
How to use:

init the plugin:
<code>
$('input-selector').validateDate();
</code>

<p>Use validate public method in any event that you want to validate the the field</p>
<code>
$('input-selector').bind('blur',function(ev){
  var isDate = $(this).validateDate('validate');
});
</code>
<p>
Ib above example validate public method will return a date object if the input is valid otherwise it will be null.
</p>

