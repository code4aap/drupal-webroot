<?php

function complete_profile_form($form, &$form_state, $account) {
  $form_state['user'] = $account;
  $form['#user'] = $account;
  $form['#user_category'] = 'account';

  user_account_form($form, $form_state);
  field_attach_form('user', $account, $form, $form_state);

  $instances = field_info_instances('user', 'user');
  foreach (element_children($form) as $key) {
    if (!isset($instances[$key])) {
      $form[$key]['#access'] = FALSE;
    }
    else {
      if (!empty($instances[$key]['required'])) {
        // If the user has already filled out a value for this field, hide it.
        if (field_get_items('user', $account, $key)) {
          $form[$key]['#access'] = FALSE;
        }
      }
    }
  }

  $form['help'] = array(
    '#markup' => '<p>Your account has now been created and you are just one last step away from directly contributing to changing how politics is practiced in India.</p><p>Please take a moment to fill up the the below required details. These details are needed to help you use the AAP platform in various meaningful ways. Whether it be to build your own manifesto, or to demand answers from your candidates, and more.</p><p>Click here in case you need help filling up the data below. --- (NOTE useful link to be added) --- </p>',
    '#weight' => -100,
  );

  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
  );

  form_load_include($form_state, 'inc', 'user', 'user.pages');
  $form['#validate'][] = 'user_profile_form_validate';
  $form['#submit'][] = 'user_profile_form_submit';

  return $form;
}
