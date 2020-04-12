<template>
  <div class="container insider">
    <h4 class="page-title">
      <i class="fas fa-bookmark" />
      <span>{{ currentPath.displayName }}</span>
    </h4>
    <div class="page-content">
      <div class="contactus">
        <ul class="address">
          <li>
            <label>
              <i class="fas fa-id-card"></i>
              {{ $L(`CompanyName`) }}
            </label>
            {{ companyInfo.appName }}
          </li>
          <li>
            <label>
              <i class="fas fa-map-marker-alt"></i>
              {{ $L(`Address`) }}
            </label>
            {{ companyInfo.appAddress }}
          </li>
          <li>
            <label>
              <i class="fas fa-phone-volume"></i>
              {{ $L(`Tel`) }}
            </label>
            {{ companyInfo.tel }}
          </li>
          <li>
            <label>
              <i class="fas fa-envelope"></i>
              {{ $L(`Email`) }}
            </label>
            {{ companyInfo.email }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      companyInfo: state => state.app.companyInfo,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  created() {}
}
</script>
